
import Chat from "../../components/chat/Chat";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import "./chatPage.scss";

function ChatPage() {
  const data = useLoaderData();

  return (
    <div className="chatPage">
      <div className="wrapper">
        <h1>Chats</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.chatResponse}
            errorElement={<p>Error loading chats!</p>}
          >
            {(chatResponse) =>
              chatResponse?.data?.length > 0 ? (
                <Chat chats={chatResponse.data} />
              ) : (
                <p>No messages yet!</p>
              )
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ChatPage;
