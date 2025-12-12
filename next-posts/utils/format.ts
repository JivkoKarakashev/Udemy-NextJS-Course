const formatTimeStamp = (createdAt: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'medium',
        timeStyle: 'short'
    }
    const timeStamp = new Date(createdAt);
    return timeStamp.toLocaleDateString('en-US', options);
}

export {
    formatTimeStamp
}