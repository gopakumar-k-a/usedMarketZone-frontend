import MessageContainer from '@/components/chat/message/MessageContainer'
import ChatSideBar from '@/components/chat/sideBar/ChatSideBar'


function ChatPage() {
  return (
    <div className='flex max-h-screen'>
      <ChatSideBar/>
      <MessageContainer/>
    </div>
  )
}

export default ChatPage
