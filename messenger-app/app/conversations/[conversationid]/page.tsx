// import getConversationById from "@/app/actions/getConversationById";
// import getMessages from "@/app/actions/getMessages";
// import EmptyState from "@/app/components/EmptyState";
// import Header from "./components/Header";

// interface Iparams {
//   conversationId: string;
// }

// const ConversationId = async ({ params }: { params: Iparams }) => {
//   // call conversation
//   const conversation = await getConversationById(params.conversationId);

//   //call messages
//   const messages = await getMessages(params.conversationId);

//   //handel if there is no conversation
//   if (!conversation) {
//     return (
//       <div className="lg:pl-80 h-full">
//         <div className="h-full flex flex-col">
//           <EmptyState />
//         </div>
//       </div>
//     );
//   }

//   // Use a type assertion to let TypeScript know that the users property exists
//   const conversationWithUsers = conversation as typeof conversation & {
//     users: any[];
//   };
//   return (
//     <div className="lg:pl-80 h-full">
//       <div className="h-full flex flex-col">
//         <Header conversation={conversationWithUsers} />
//       </div>
//     </div>
//   );
// };

// export default ConversationId;

import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import Header from "./components/Header";
//import Body from "./components/Body";
//import Form from "./components/Form";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
          
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        {/* <Body initialMessages={messages} />
        <Form /> */}
      </div>
    </div>
  );
}

export default ChatId;
