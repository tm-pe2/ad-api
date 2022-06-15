import {generateInvoices} from "./generate-invoice-util";
import schedule from 'node-schedule'
import {INVOICE_TYPE} from "../models/invoice";

export const scheduleInvoiceJobs = () => {
    const dailyRule = new schedule.RecurrenceRule();
    dailyRule.dayOfWeek = new schedule.Range(0, 6);
    dailyRule.hour = 23;
    dailyRule.minute = 0;

    const advanceInvoiceJob = schedule.scheduleJob(dailyRule, async function(){
        await generateInvoices(INVOICE_TYPE.ADVANCE);
        console.log("Next advance invoice run on:");
        console.log(advanceInvoiceJob.nextInvocation());
    });

    const weeklyRule = new schedule.RecurrenceRule();
    weeklyRule.dayOfWeek = 0;
    weeklyRule.hour = 23;
    weeklyRule.minute = 0;

    const annualInvoiceJob = schedule.scheduleJob(weeklyRule, async function(){
        await generateInvoices(INVOICE_TYPE.DEBIT);

        console.log("Next annual invoice job on:");
        console.log(annualInvoiceJob.nextInvocation());
    });
}
