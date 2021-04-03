import Knex from 'knex';

export async function up(knex: Knex) {
    return Promise.all([
        knex("users").insert([
            {
                id: null,
                name:"Ana Lucia",
                avatar: "https://avatars.githubusercontent.com/u/51336956?v=4",
                whatsapp: "WAPP",
                bio: "Tenho XX idade dou aula de Artes."
            },
            {
                id: null,
                name: "Rodrigo",
                avatar: "https://avatars.githubusercontent.com/u/7852824?v=4",
                whatsapp: "WAPP",
                bio: "Tenho XX idade dou aula de Biologia."
            }
        ]),
        knex("classes").insert([
            {
                id: null,
                subject: "Artes",
                cost: 100,
                user_id: 1
            },
            {
                id: null,
                subject: "Biologia",
                cost: 200,
                user_id: 2
            }
        ]),
        knex("class_schedule").insert([
            {
                id: null,
                week_day: 1,
                from: "08:30",
                to: "18:00",
                class_id: "18:00"
            },
            {
                id: null,
                week_day: 2,
                from: "08:30",
                to: "18:00",
                class_id: "18:00"
            }
        ]),
    ]) 
}

export async function down(knex: Knex) {
    return Promise.all([
        knex.table("users").delete(),
        knex.table("classes").delete(),
        knex.table("class_schedule").delete()
    ])
}