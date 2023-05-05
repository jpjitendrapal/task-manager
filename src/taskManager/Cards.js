import Card from "./Card"

export default function Cards({cards=[], task}){
    return (<div className="cards">
       {cards.map(card=>{
        return <Card key={card.id} card={card} task={task} />
       })}
    </div>)
}