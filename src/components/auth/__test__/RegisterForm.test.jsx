import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import RegisterForm from "../RegisterForm";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { screen, render, cleanup } from "@testing-library/react";

expect.extend(matchers);

const onFormSubmit = (params) => {};

describe("RegisterForm component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correctly", async () => {
    const name = "name-123";

    render(<RegisterForm onSubmit={onFormSubmit} />);
    const nameInput = await screen.getByPlaceholderText("Name");

    await userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
  });

  it("should handle email typing correctly", async () => {
    const email = "test@mail.com";

    render(<RegisterForm onSubmit={onFormSubmit} />);
    const emailInput = await screen.getByPlaceholderText("Email");

    await userEvent.type(emailInput, email);

    expect(emailInput).toHaveValue(email);
  });

  it("should handle password typing correctly", async () => {
    const password = "super-secret-123";

    render(<RegisterForm onSubmit={onFormSubmit} />);
    const passwordInput = await screen.getByPlaceholderText("Password");

    await userEvent.type(passwordInput, password);

    expect(passwordInput).toHaveValue(password);
  });

  it("should call onFormSubmit when Register click", async () => {
    const name = "user-123";
    const email = "test@mail.com";
    const password = "super-secret-123";

    render(<RegisterForm onSubmit={onFormSubmit} />);
    const nameInput = await screen.getByPlaceholderText("Name");
    const emailInput = await screen.getByPlaceholderText("Email");
    const passwordInput = await screen.getByPlaceholderText("Password");
    const registerButton = await screen.getByRole("button", {
      name: "Regoster",
    });

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.click(registerButton);

    expect(onFormSubmit).toBeCalledWith(name, email, password);
  });
});
