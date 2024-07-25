type Props={
    description: string
}
export default function Gameover({description}: Props){
    return (
        <div>
            <div>Game over!</div>
            <div>{description}</div>
        </div>
    )
}