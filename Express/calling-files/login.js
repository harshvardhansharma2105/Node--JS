export default function login(){ 
    return `<form method="POST" action="/submit">
            <input type="email" placeholder="enter email" />
            <input type="password" placeholder="enter password" />
            <button>Submit</button>
        </form>`
}