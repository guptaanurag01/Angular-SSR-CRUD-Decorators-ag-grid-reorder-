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
