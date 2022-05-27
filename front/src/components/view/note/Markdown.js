// import React, { useEffect, useState } from "react";
// import Markdown from "markdown-to-jsx";

// import * as Api from '../../../api';

// const Mdfile = () => {
//   const fileName = "test2.md";
//   const [post, setPost] = useState("");

//   useEffect(() => {
//     import(`./post/${fileName}`)
//       .then((res) => {
//         fetch(res.default)
//           .then((res) => res.text())
//           .then((res) => setPost(res))
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => console.log(err));
//   });
//   return (
//     <div>
//       <Markdown>{post}</Markdown>
//     </div>
//   );
// };

// export default Mdfile;