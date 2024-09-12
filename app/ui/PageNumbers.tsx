export default async function PageNumbers({number}: {number: number}) {
    const array = new Array(number);

    return <div className={'flex'}>
        {array.map((_: any, i: number, arr: any[]) => {
            return NumberItem({length: arr.length, number: i});
        })}
    </div>
}

function NumberItem({number, length}: {number: number, length: number}) {
    return <p key={number}>{number === 0 ? '<' : ''} {number} {number === (length-1) ? '>' : ''}</p>
}
