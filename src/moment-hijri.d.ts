declare module 'moment-hijri' {
  import { Moment, MomentInput } from 'moment';

  interface HijriMoment extends Moment {
    iYear(value?: number): number & HijriMoment;
    iMonth(value?: number): number & HijriMoment;
    iDate(value?: number): number & HijriMoment;
    iDaysInMonth(): number;
  }

  interface HijriMomentFactory {
    (inp?: MomentInput, format?: string, strict?: boolean): HijriMoment;
    (): HijriMoment;
  }

  const moment: HijriMomentFactory;
  export = moment;
}