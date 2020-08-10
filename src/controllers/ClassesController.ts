import { Request, Response } from 'express';

import db from '.././database/connection';
import convertHoursToMinutes from '.././utils/convertHourToMinute';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;
        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;


        if (!week_day && !subject && !time) {
            const classes = await db('classes')
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);
            return response.status(200).send(classes);
        } else {
            let timeInMinutes: string = time ? String(convertHoursToMinutes(time)) : '';

            let classes = db.select(['c.*', 'u.*'])
                .distinct()
                .from('classes as c')
                .innerJoin('users as u', 'c.user_id', 'u.id')
                .innerJoin('class_schedule as cs', 'cs.class_id', 'c.id')

            if (subject) classes = classes.where('c.subject', subject);
            if (week_day) classes = classes.where('cs.week_day', week_day);
            if (timeInMinutes) classes = classes.where('cs.to', timeInMinutes);
            if (timeInMinutes) classes = classes.where('cs.from', timeInMinutes);
            
            classes.then((result) => {return response.status(200).json(result)});
        }


    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedules
        } = request.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            const user_id = insertedUsersIds[0];
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
            const class_id = insertedClassesIds[0];
            const classSchedule = schedules.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    to: convertHoursToMinutes(scheduleItem.to),
                    from: convertHoursToMinutes(scheduleItem.from),
                    class_id
                };
            });

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            return response.status(201).send();
        } catch (error) {
            await trx.rollback();

            return response.status(400).json({
                message: 'Unexpected error while creating new class'
            });
        }

    }
}