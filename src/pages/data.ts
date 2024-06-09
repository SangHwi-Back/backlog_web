
export type TestData = {
    key: number;
    title: string;
    description: string;
    date: Date;
}

export let TESTDATA: Array<TestData> = [
    {
        key: 0,
        title: 'test1',
        description: '',
        date: new Date('2024-06-09'),
    },
    {
        key: 1,
        title: 'test1',
        description: '',
        date: new Date('2024-06-09'),
    }
];