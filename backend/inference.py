import torch
import joblib
import json
from model_def import CustomLSTM

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load scaler
scaler = joblib.load("scaler.pkl")

# Load labels
with open("labels.json", "r") as f:
    labels = json.load(f)

num_classes = len(labels)

# Load model
model = CustomLSTM(input_size=258, hidden_size=64, num_classes=num_classes, dropout=0.4)
model.load_state_dict(torch.load("trained_model.pth", map_location=device))
model.to(device)
model.eval()

def predict(sequence_np):
    """
    sequence_np: (T, 258) numpy array
    """
    T = sequence_np.shape[0]

    # Apply SAME scaler used in training
    scaled = scaler.transform(sequence_np.reshape(-1, 258)).reshape(T, 258)

    x = torch.tensor(scaled, dtype=torch.float32).unsqueeze(0).to(device)  # (1, T, 258)

    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1)
        top_probs, top_idxs = torch.topk(probs, k=5)

    results = []
    for p, idx in zip(top_probs[0], top_idxs[0]):
        results.append({
            "gloss": labels[str(idx.item())],
            "confidence": round(p.item() * 100, 2)
        })

    return results
