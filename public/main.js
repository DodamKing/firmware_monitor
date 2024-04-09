const downloadFile = (fileName) => {
    window.location = `/download/${fileName}`
}

const deleteFile = (fileName) => {
    if (confirm('삭제하시겠습니까?')) window.location = `/delete/${fileName}`
}