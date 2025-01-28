import React from 'react'

type Props = {
  image: string,
  title: string,
  description: string
}

const FeatureCard = ({ image, title, description }: Props) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-md transition  mt-8 gap-3 items-center justify-center ml-5 ">
      <img className="mb-4" src={image} alt={title} /> {/* Added alt text for accessibility */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const Comments = () => {
  const comments = [
    {
      author: "User 1",
      avatar: "placeholder-image-1.png", // Or a URL to a placeholder image
      text: "This is a great product! I highly recommend it.",
      date: "2024-10-27" // Example date
    },
    {
      author: "User 2",
      avatar: "placeholder-image-2.png",
      text: "I'm so glad I found this website. It has helped me so much with my writing.",
      date: "2024-10-26"
    },
    {
      author: "User 3",
      avatar: "placeholder-image-3.png",
      text: "This is the best creative writing assistant I've ever used. It's so easy to use and it has so many great features.",
      date: "2024-10-25"
    },
    {
      author: "User 4",
      avatar: "placeholder-image-4.png",
      text: "Really impressed with the AI features. It's like having a writing partner!",
      date: "2024-10-24"
    },
    {
      author: "User 5",
      avatar: "placeholder-image-5.png",
      text: "The collaborative writing tools are a game-changer for my team.",
      date: "2024-10-23"
    }
  ];

  return (
    <div>
      <h1 className='text-center text-3xl mt-4'>Feedbacks</h1>
<div className="comments-container lg:grid lg:grid-cols-3  sm-md:flex sm-md:flex-col pr-4"> {/* Added a class name for styling */}
  
  {comments.map((comment) => (
    <FeatureCard
      key={comment.author} // Added key prop for better performance
      image={comment.avatar}
      title={comment.author}
      description={comment.text}
    />
  ))}
</div>
    </div>
    
  );
};

export default Comments;