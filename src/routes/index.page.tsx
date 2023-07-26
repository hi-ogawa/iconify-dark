import { getTheme, setTheme } from "@hiogawa/theme-script";
import React from "react";

export function Component() {
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-3 p-2 px-4">
        <span className="flex-1"></span>
        <a
          className="i-ri-github-line w-6 h-6"
          href="https://github.com/hi-ogawa/iconify-dark"
          target="_blank"
        />
        <ThemeSelect />
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xl">TODO</div>
      </div>
    </div>
  );
}

function ThemeSelect() {
  // TODO: theme storage in cookie session?
  const rerender = React.useReducer((prev) => !prev, true)[1];

  return (
    <label className="flex gap-2">
      <span>Theme</span>
      <select
        className="antd-input px-1 capitalize"
        value={import.meta.env.SSR ? "system" : getTheme()}
        onChange={(e) => {
          setTheme(e.target.value);
          rerender();
        }}
      >
        {["system", "dark", "light"].map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
}
