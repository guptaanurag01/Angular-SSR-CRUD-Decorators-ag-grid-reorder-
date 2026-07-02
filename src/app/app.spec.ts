import { ComponentFixture, TestBed } from "@angular/core/testing";
import { App } from "./app";

describe("App calendar locale behavior", () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let originalNavigatorLanguageDescriptor: PropertyDescriptor | undefined;

  beforeEach(async () => {
    originalNavigatorLanguageDescriptor = Object.getOwnPropertyDescriptor(
      window.navigator,
      "language"
    );
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      value: "en-US",
    });

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (originalNavigatorLanguageDescriptor) {
      Object.defineProperty(
        window.navigator,
        "language",
        originalNavigatorLanguageDescriptor
      );
    }
  });

  it("shows 12 months for any locale", () => {
    expect(component.months().length).toBe(12);
  });

  it("shows English Hijri month names when browser is en-US and Hijri is selected", () => {
    component.selectedLocale.set("ar-SA");
    component.onLocaleChange();

    expect(component.months()[0]).toBe("Moharam");
    expect(component.months()[8]).toBe("Ramadan");
    expect(component.months()[11]).toBe("Tho El Hegga");
  });

  it("shows Hijri years (1400s range) in year dropdown when Hijri is selected", () => {
    component.selectedLocale.set("ar-SA");
    component.onLocaleChange();

    const years = component.years();
    expect(years.length).toBeGreaterThan(0);
    expect(Number(years[0])).toBeGreaterThan(1400);
    expect(Number(years[years.length - 1])).toBeLessThan(1500);
  });

  it("selected year is a Hijri year when Hijri calendar is active", () => {
    component.selectedLocale.set("ar-SA");
    component.onLocaleChange();

    const year = Number(component.selectedYear());
    expect(year).toBeGreaterThan(1400);
    expect(year).toBeLessThan(1500);
  });

  it("shows English Gregorian month names when Gregorian is selected", () => {
    component.selectedLocale.set("en-US");
    component.onLocaleChange();

    expect(component.months()[0]).toBe("January");
    expect(component.months()[6]).toBe("July");
  });

  it("shows Gregorian years (2000s range) when Gregorian is selected", () => {
    component.selectedLocale.set("en-US");
    component.onLocaleChange();

    const years = component.years();
    expect(years.length).toBeGreaterThan(0);
    expect(Number(years[0])).toBeGreaterThan(2000);
    expect(Number(years[years.length - 1])).toBeLessThan(2100);
  });

  it("selected year is a Gregorian year when Gregorian calendar is active", () => {
    component.selectedLocale.set("en-US");
    component.onLocaleChange();

    const year = Number(component.selectedYear());
    expect(year).toBeGreaterThan(2000);
    expect(year).toBeLessThan(2100);
  });

  it("switches from Gregorian to Hijri: months and years update correctly", () => {
    component.selectedLocale.set("en-US");
    component.onLocaleChange();
    expect(component.months()[0]).toBe("January");

    component.selectedLocale.set("ar-SA");
    component.onLocaleChange();

    expect(component.months()[0]).toBe("Moharam");
    expect(Number(component.years()[0])).toBeGreaterThan(1400);
    expect(Number(component.selectedYear())).toBeGreaterThan(1400);
  });

  it("Hijri date text uses iDD-iMM-iYYYY format", () => {
    component.selectedLocale.set("ar-SA");
    component.onLocaleChange();

    const text = component.selectedDateText();
    expect(text).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    const [, , year] = text.split("-");
    expect(Number(year)).toBeGreaterThan(1400);
  });

  it("Gregorian date text uses DD-MM-YYYY format", () => {
    component.selectedLocale.set("en-US");
    component.onLocaleChange();

    const text = component.selectedDateText();
    expect(text).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    const [, , year] = text.split("-");
    expect(Number(year)).toBeGreaterThan(2000);
  });
});
