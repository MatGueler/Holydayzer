import express from 'express'
import dayjs from 'dayjs'

const server = express();

const holidays =
    [
        { date: "1/1/2022", name: "Confraternização mundial" },
        { date: "1/3/2022", name: "Carnaval" },
        { date: "4/17/2022", name: "Páscoa" },
        { date: "4/21/2022", name: "Tiradentes" },
        { date: "5/1/2022", name: "Dia do trabalho" },
        { date: "6/16/2022", name: "Corpus Christi" },
        { date: "9/7/2022", name: "Independência do Brasil" },
        { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
        { date: "11/2/2022", name: "Finados" },
        { date: "11/15/2022", name: "Proclamação da República" },
        { date: "12/25/2022", name: "Natal" }
    ];

server.get('/holidays', (req, res) => {
    res.send(holidays);
})


server.get('/holidays/:m', (req, res) => {
    const month = req.params.m;
    let monthHolidays = []

    for (let counter = 0; counter < holidays.length; counter++) {
        let holiday = dayjs(`${holidays[counter].date}`).format('M');
        if (holiday === month) {
            monthHolidays.push(holidays[counter])
        }
    }
    res.send(monthHolidays);
})


server.get('/is-today-holiday', (req, res) => {
    const today = dayjs().format('M/D/YYYY');

    let verification = 0;

    for (let counter = 0; counter < holidays.length; counter++) {
        if (today === holidays[counter].date) {
            verification += 1;
            let isHoliday = `Sim, hoje é ${holidays[counter].name}`
            res.send(isHoliday)
            break
        }
    }

    if (verification === 0) {
        let isNotHoliday = `Não, hoje não é feriado`
        res.send(isNotHoliday)
    }

})

server.listen(4000)