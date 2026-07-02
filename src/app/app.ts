import { Component, input, output, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Parent } from "./parent/parent";
import { User } from "./user/user";
import { Reorder } from "./reorder/reorder";
import { Crud } from "./crud/crud";
import { CommonTable } from "./common-table/common-table";
import { AgGrid } from "./ag-grid/ag-grid";
import { Ssrs } from "./ssrs/ssrs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import moment from 'moment-hijri';

export enum DefaultCultureOption {
  Hijri = "Hijri",
  Gregorian = "Gregorian",
}

@Component({
  selector: "app-root",
  imports: [
    // RouterOutlet,
    // Parent,
    // User,
    // Reorder,
    // Crud,
    // CommonTable,
    // AgGrid,
    // Ssrs,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("latestAngular");

  senderName = input<string>("");
  calendarFormat = input<number>(0);
  defaultCalendarCulture = input<DefaultCultureOption>(
    DefaultCultureOption.Hijri
  );
  minYearCountFromNow = input<number>(-10);
  maxYearCountFromNow = input<number>(10);

  dateChanged = output<string>();

  selectedLocale = signal<string>("ar-SA");
  displayCulture = signal<string>("ar-SA");
  selectedYear = signal<string>("");
  selectedMonth = signal<number>(0);
  selectedDateText = signal<string>("");
  isCalendarVisible = signal<boolean>(true);

  years = signal<string[]>([]);
  months = signal<string[]>([]);
  calendarDays = signal<number[][]>([]);
  selectedDay = signal<number>(0);
  readonly dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  private internalDate: any;

  private readonly monthNamesMap: Record<
    string,
    { hijri: string[]; greg: string[] }
  > = {
    "ar-SA": {
      hijri: [
        "محرم",
        "صفر",
        "ربيع الأول",
        "ربيع الثاني",
        "جمادى الأولى",
        "جمادى الثانية",
        "رجب",
        "شعبان",
        "رمضان",
        "شوال",
        "ذو القعدة",
        "ذو الحجة",
      ],
      greg: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
    },
    "en-US": {
      hijri: [
        "Moharam",
        "Safar",
        "Rabea El Awal",
        "Rabea El Thani",
        "Gamad El Awal",
        "Gamad El Thani",
        "Ragab",
        "Shabaan",
        "Ramadan",
        "Shawal",
        "Tho El Qeaeda",
        "Tho El Hegga",
      ],
      greg: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  };

  ngOnInit(): void {
    this.internalDate = moment();
    this.initializeDisplayCulture();
    this.initComponent();
  }

  private initializeDisplayCulture(): void {
    const browserLang = (window.navigator.language || "").toLowerCase();
    this.displayCulture.set(browserLang.startsWith("en") ? "en-US" : "ar-SA");
  }

  private initComponent(): void {
    this.selectedLocale.set(
      this.defaultCalendarCulture() === DefaultCultureOption.Gregorian
        ? "en-US"
        : "ar-SA"
    );
    this.populateDropdowns();
    this.updateDisplayDate();
  }

  populateDropdowns(): void {
    const lang = this.displayCulture() === "en-US" ? "en-US" : "ar-SA";
    const generatedYears: string[] = [];

    if (this.selectedLocale() === "ar-SA") {
      const hijriDate = moment(this.internalDate) as any;
      const currentHijriYear: number = hijriDate.iYear();
      for (
        let i = currentHijriYear + this.minYearCountFromNow();
        i <= currentHijriYear + this.maxYearCountFromNow();
        i++
      ) {
        generatedYears.push(i.toString());
      }
      this.years.set(generatedYears);
      this.months.set(this.monthNamesMap[lang].hijri);
      this.selectedYear.set(currentHijriYear.toString());
      this.selectedMonth.set(hijriDate.iMonth());
    } else {
      const currentGregYear: number = moment(this.internalDate).year();
      for (
        let i = currentGregYear + this.minYearCountFromNow();
        i <= currentGregYear + this.maxYearCountFromNow();
        i++
      ) {
        generatedYears.push(i.toString());
      }
      this.years.set(generatedYears);
      this.months.set(this.monthNamesMap[lang].greg);
      this.selectedYear.set(currentGregYear.toString());
      this.selectedMonth.set(moment(this.internalDate).month());
    }
    this.generateCalendarGrid();
  }

  updateDisplayDate(): void {
    if (!this.internalDate) return;

    if (this.selectedLocale() === "ar-SA") {
      this.selectedDateText.set(
        (moment(this.internalDate) as any).format("iDD-iMM-iYYYY")
      );
    } else {
      this.selectedDateText.set(moment(this.internalDate).format("DD-MM-YYYY"));
    }
    this.dateChanged.emit(this.selectedDateText());
  }

  toggleCalendar(): void {
    this.isCalendarVisible.update((prev) => !prev);
  }

  onLocaleChange(): void {
    this.populateDropdowns();
    this.updateDisplayDate();
  }

  generateCalendarGrid(): void {
    const weeks: number[][] = [];
    let firstDayOfWeek: number;
    let daysInMonth: number;
    let currentDay: number;

    if (this.selectedLocale() === 'ar-SA') {
      const hijriFirst: any = (moment(this.internalDate) as any)
        .iYear(parseInt(this.selectedYear(), 10))
        .iMonth(this.selectedMonth())
        .iDate(1);
      firstDayOfWeek = hijriFirst.day();
      daysInMonth = hijriFirst.iDaysInMonth();
      const id: any = moment(this.internalDate);
      currentDay =
        id.iYear() === parseInt(this.selectedYear(), 10) &&
        id.iMonth() === this.selectedMonth()
          ? id.iDate()
          : 0;
    } else {
      const gregFirst = moment(this.internalDate)
        .year(parseInt(this.selectedYear(), 10))
        .month(this.selectedMonth())
        .date(1);
      firstDayOfWeek = gregFirst.day();
      daysInMonth = gregFirst.daysInMonth();
      const id = moment(this.internalDate);
      currentDay =
        id.year() === parseInt(this.selectedYear(), 10) &&
        id.month() === this.selectedMonth()
          ? id.date()
          : 0;
    }

    this.selectedDay.set(currentDay);

    let week: number[] = new Array(firstDayOfWeek).fill(0);
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        weeks.push([...week]);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(0);
      weeks.push(week);
    }
    this.calendarDays.set(weeks);
  }

  onDayClick(day: number): void {
    if (!day) return;
    this.selectedDay.set(day);
    if (this.selectedLocale() === 'ar-SA') {
      this.internalDate = (moment(this.internalDate) as any)
        .iYear(parseInt(this.selectedYear(), 10))
        .iMonth(this.selectedMonth())
        .iDate(day);
    } else {
      this.internalDate = moment(this.internalDate)
        .year(parseInt(this.selectedYear(), 10))
        .month(this.selectedMonth())
        .date(day);
    }
    this.updateDisplayDate();
  }

  onMonthChange(): void {
    if (this.selectedLocale() === "ar-SA") {
      this.internalDate = (moment(this.internalDate) as any)
        .iYear(parseInt(this.selectedYear(), 10))
        .iMonth(Number(this.selectedMonth()))
        .iDate(1);
    } else {
      this.internalDate = moment(this.internalDate)
        .year(parseInt(this.selectedYear(), 10))
        .month(Number(this.selectedMonth()))
        .date(1);
    }
    this.updateDisplayDate();
    this.generateCalendarGrid();
  }

  onYearChange(): void {
    if (this.selectedLocale() === "ar-SA") {
      this.internalDate = (moment(this.internalDate) as any)
        .iYear(parseInt(this.selectedYear(), 10))
        .iMonth(Number(this.selectedMonth()))
        .iDate(1);
    } else {
      this.internalDate = moment(this.internalDate)
        .year(parseInt(this.selectedYear(), 10))
        .month(Number(this.selectedMonth()))
        .date(1);
    }
    this.updateDisplayDate();
    this.generateCalendarGrid();
  }

  onDateSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.value) {
      this.internalDate = moment(new Date(inputElement.value));
      this.populateDropdowns();
      this.updateDisplayDate();
    }
  }
}
