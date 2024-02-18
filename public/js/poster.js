async function postHandler(e){
    e.preventDefault();
    const postContent = document.getElementById('postContent').value
    const response = await fetch('/api/blogPost/',{
        method:"POST",
        body:JSON.stringify({postContent, }),
        headers: {"Content-Type": "application/json"}
    });
    if (response.ok){
        document.location.replace("/posts")
    }
    else{
        alert("post failed please try again.")
    }
}
document.querySelector('#postHandler').addEventListener('submit', postCreate)
