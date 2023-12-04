import { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const { data: blogs, isLoading, error } = useFetch("http://localhost:8000/blogs")
    const [sortCriteria, setSortCriteria] = useState("newest");

    const handleSortChange = (value) => {
        setSortCriteria(value);
    };

    // Sort blogs based on the selected criteria
    const sortedBlogs = blogs
        ? [...blogs].sort((a, b) => {
              switch (sortCriteria) {
                  case "newest":
                      return b.id - a.id;
                  case "likes":
                      return b.likes - a.likes;
                  case "author":
                      return a.author.localeCompare(b.author);
                  default:
                      return 0;
              }
          })
        : [];

    // Filter blogs authored by "Mint"
    const mintBlogs = blogs ? blogs.filter(blog => blog.author === "mint") : [];

    return (
        <div className="home">
            {error && <div>Error: { error }</div>}
            {isLoading && <div>Loading...</div>}
            
            {/* Render Mint's blogs section only if there are mint blogs */}
            {mintBlogs.length > 0 && <BlogList blogs={mintBlogs} title="Mint's blogs"/>}
            {/* Render All Blogs section with buttons for sorting */}
            {sortedBlogs.length > 0 && (
                <div className="all-blogs-section">
                    <h2>All Blogs</h2>
                    <div className="sort-section">
                        <label>
                            Sort by:
                            <button
                                className={sortCriteria === "newest" ? "active" : ""}
                                onClick={() => handleSortChange("newest")}
                            >
                                🔥Newest
                            </button>
                        </label>
                        <label>
                            <button
                                className={sortCriteria === "likes" ? "active" : ""}
                                onClick={() => handleSortChange("likes")}
                            >
                                👍/👎Likes
                            </button>
                        </label>
                        <label>
                            <button
                                className={sortCriteria === "author" ? "active" : ""}
                                onClick={() => handleSortChange("author")}
                            >
                                ✍️Author
                            </button>
                        </label>
                    </div>
                    <BlogList blogs={sortedBlogs} title="" />
                </div>
            )}
        </div>
    );
}

export default Home;