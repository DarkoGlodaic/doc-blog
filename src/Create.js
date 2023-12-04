import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mint");
    const [customAuthor, setCustomAuthor] = useState(""); // New state for other author
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const hanldeSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author: author === "other" ? customAuthor.toLowerCase() : author, likes: 0};
        
        setIsLoading(true);

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("New blog added");
            setIsLoading(false)
            navigate("/");
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={hanldeSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                ></textarea>

                <label>Blog author</label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mint">mint</option>
                    <option value="other">other</option>
                </select>

                {/* Conditionally render input for custom author if "other" is selected */}
                {author === "other" && (
                    <input
                        type="text"
                        value={customAuthor}
                        onChange={(e) => setCustomAuthor(e.target.value)}
                        placeholder="Enter author"
                        required
                    />
                )}

                { !isLoading && <button>Add Blog</button> }
                { isLoading && <button disabled>Adding blog...</button> }
            </form>
        </div>
            
    );
}
 
export default Create;