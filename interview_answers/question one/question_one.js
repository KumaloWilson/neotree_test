const data = [
    {
        id: 1,
        unique_key: "abc1234567890def",
        uid: "ABCD-001010",
        data: {
            entries: [1, 2, 3]
        }
    },
    {
        id: 2,
        unique_key: "xyz9876543210ghi",
        uid: "CDBA-908978",
        data: {
            entries: [4, 5]
        }
    },
    {
        id: 3,
        unique_key: "anotherkey",
        uid: "ABCD-001010",
        data: {
            entries: [6, 7]
        }
    }
];

export default function deduplicator(arr) {
    const seenUIDs = new Set();
    const deduplicated = [];

    for (const obj of arr) {
        if (!seenUIDs.has(obj.uid)) {
            seenUIDs.add(obj.uid);
            deduplicated.push(obj);
        }
    }

    return deduplicated;
}

console.log(deduplicator(data));
