
interface ButtonType {
    name: string,
    onClick: () => void,
}


export default function GenerateButton({name, onClick}: ButtonType) {
    return (
        <button onClick={onClick}>{name}</button>
    )
}

//