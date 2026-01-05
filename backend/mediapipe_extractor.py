import mediapipe as mp
import numpy as np
import cv2

mp_holistic = mp.solutions.holistic

def extract_landmarks(video_path: str, max_frames: int):
    cap = cv2.VideoCapture(video_path)
    sequence = []

    with mp_holistic.Holistic(static_image_mode=False, model_complexity=1) as holistic:
        while len(sequence) < max_frames:
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = holistic.process(image)

            frame_features = []

            # Pose (33*4)
            if results.pose_landmarks:
                for lm in results.pose_landmarks.landmark:
                    frame_features.extend([lm.x, lm.y, lm.z, lm.visibility])
            else:
                frame_features.extend([0] * 33 * 4)

            # Left hand (21*3)
            if results.left_hand_landmarks:
                for lm in results.left_hand_landmarks.landmark:
                    frame_features.extend([lm.x, lm.y, lm.z])
            else:
                frame_features.extend([0] * 21 * 3)

            # Right hand (21*3)
            if results.right_hand_landmarks:
                for lm in results.right_hand_landmarks.landmark:
                    frame_features.extend([lm.x, lm.y, lm.z])
            else:
                frame_features.extend([0] * 21 * 3)

            sequence.append(frame_features)

    cap.release()

    # pad to max_frames
    while len(sequence) < max_frames:
        sequence.append([0] * 258)

    return np.array(sequence, dtype=np.float32)  # (T, 258)
