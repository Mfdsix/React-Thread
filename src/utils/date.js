const MONTHS = [
    '-',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
]

const convertDate = (date) => {
    try{
        const jsDate = new Date(date)

        const year = jsDate.getFullYear()
        const month = MONTHS[jsDate.getMonth()]
        const day = jsDate.getDate()

        const hour = jsDate.getHours()
        const minute = jsDate.getMinutes()

        return [
            [day, month, year].join(" "),
            [hour, minute].join(":")
        ].join(" ")
    }catch(e){
        return '-'
    }
}

export {
    convertDate
}