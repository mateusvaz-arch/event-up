import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventCard from "./EventCard";

const mockEvent = {
  id: 1,
  title: "Evento Teste",
  date: "20/03/2026",
  location: "São Paulo",
  isFree: true,
  image: "",
};

test("renders event details correctly", () => {
  render(<EventCard event={mockEvent} />);
  expect(screen.getByText("Evento Teste")).toBeInTheDocument();
  expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
  expect(screen.getByText("Gratuito")).toBeInTheDocument();
});

test("calls favorite alert when clicking button", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
  const mockLocalStorage = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
    writable: true,
  });

  render(<EventCard event={mockEvent} />);
  
  screen.debug();
  
  alertSpy.mockRestore();
});
