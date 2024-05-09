import base64

import torch
from fastapi import APIRouter
from transformers import BertTokenizer, BertForSequenceClassification

router = APIRouter(
    prefix="/propaganda-analysis",
    tags=["Propaganda Analysis"],
    responses={404: {"description": "Not found"}},
)
model_path = r"app\backend\saved_model"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)


def classify_text_bert(text, model, tokenizer):
    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt")

    outputs = model(**inputs)

    predicted_class = torch.argmax(outputs.logits, dim=1).item()

    return True if predicted_class == 1 else False


@router.get("/get/result/{text}")
async def get_settings(text):
    decoded_text = base64.b64decode(text).decode("utf-8")
    prediction = classify_text_bert(decoded_text, model, tokenizer)
    print("Prediction:", prediction)
    return f"{prediction}"
