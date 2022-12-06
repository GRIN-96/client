import axios from "axios";

// firebase database에 접근하여 모든 message 정보 가져오기.

export const messageData = async () => {
  const response = await axios.get(
    "https://test-project-c773d-default-rtdb.firebaseio.com/message.json"
  );
  return response.data;
};

// firebase database에 접근하여 새로운 message 정보 등록하기.

export const messageUpdate = async (messageContent) => {
  await axios.post(
    "https://test-project-c773d-default-rtdb.firebaseio.com/message.json",
    messageContent
  );
};
