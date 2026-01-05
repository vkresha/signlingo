import torch
import torch.nn as nn

class CustomLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes, dropout=0.4):
        super(CustomLSTM, self).__init__()

        self.lstm1 = nn.LSTM(
            input_size,
            hidden_size,
            batch_first=True,
            bidirectional=True
        )

        self.batch_norm = nn.BatchNorm1d(hidden_size * 2)
        self.dropout = nn.Dropout(dropout)

        self.fc1 = nn.Linear(hidden_size * 2, 64)
        self.fc2 = nn.Linear(64, 32)
        self.output_layer = nn.Linear(32, num_classes)

    def forward(self, x):
        x, _ = self.lstm1(x)
        x = x[:, -1, :]

        x = self.batch_norm(x)
        x = self.dropout(x)

        x = torch.relu(self.fc1(x))
        x = self.dropout(x)

        x = torch.relu(self.fc2(x))
        return self.output_layer(x)