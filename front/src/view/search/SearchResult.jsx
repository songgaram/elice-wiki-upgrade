import Post from "../home/Post";

function SearchResult({ filteredList }) {
    return (
        <>
            <span>
                총 <span style={{ fontWeight: 500 }}>{filteredList.length}</span>
                개의 포스트를 찾았습니다.
            </span>
            <>
                {filteredList.map((post, idx) => (
                    <Post post={post} idx={idx} key={post.post_id} />
                ))}
            </>
        </>
    );
}

export default SearchResult;
