import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {

    const [likes, setLikes] = useState({});

    const handleLike = (thisBlog) => {
        const isLiked = likes[thisBlog.id];
        if(isLiked === true){
            thisBlog.likes--;
            fetch("http://localhost:8000/blogs/" + thisBlog.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: thisBlog.likes}),
            })
        }else{
            thisBlog.likes++;
            fetch("http://localhost:8000/blogs/" + thisBlog.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: thisBlog.likes}),
            })
        }
        setLikes((likes) => ({
            ...likes,
            [thisBlog.id]: !isLiked,
        }))
    };

    useEffect(() => {
        // This effect will run whenever 'blogs' is updated
        console.log("Updated blogs in useEffect:", blogs);
     }, [blogs]);

    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    {blog.likes>0 && blog.likes < 2 && <p><br></br><b>Liked {blog.likes} time</b></p>}
                    {blog.likes>1 && <p><br></br><b>Liked {blog.likes} times</b></p>}

                    </Link>
                    <button onClick={() => handleLike(blog)}>
                        {likes[blog.id] ? "Unlike 👎" : "Like 👍"}
                    </button>

                </div>
            ))}
        </div>
     );
}
 
export default BlogList;