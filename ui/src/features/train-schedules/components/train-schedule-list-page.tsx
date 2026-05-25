"use client";

import Link from "next/link";
import { useState } from "react";
import { alertManager } from "@/lib/sweetalert-manager";
import { getApiErrorMessage } from "../api/train-schedules-api";
import { useTrainSchedules } from "../hooks/use-train-schedules";
import type { TrainSchedule, TrainScheduleSearchParams } from "../types/train-schedule";

export function TrainScheduleListPage() {
  const [draft, setDraft] = useState({
    trainNo: "",
    fromStation: "",
    toStation: "",
  });
  const [search, setSearch] = useState<TrainScheduleSearchParams>({});
  const query = useTrainSchedules(search);

  if (query.isError) {
    void alertManager.showAlert(getApiErrorMessage(query.error), "error");
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans leading-normal tracking-normal">
      <div className="container mx-auto my-8 max-w-6xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            <i className="fa-solid fa-train mr-2 text-blue-600" />
            หน้าจอแสดงผลการเข้า-ออกของรถไฟ
          </h1>
          <Link
            href="/manage"
            className="flex items-center rounded-md bg-emerald-600 px-5 py-2 font-medium text-white shadow-sm transition duration-200 hover:bg-emerald-700"
          >
            <i className="fa-solid fa-plus mr-2" /> Add
          </Link>
        </div>

        <div className="mb-8 rounded-lg bg-gray-100 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
            ค้นหาข้อมูล
          </h2>
          <form
            className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSearch({
                trainNo: draft.trainNo.trim() || undefined,
                fromStation: draft.fromStation.trim() || undefined,
                toStation: draft.toStation.trim() || undefined,
              });
            }}
          >
            <SearchInput
              label="Train No:"
              placeholder="เช่น 275"
              value={draft.trainNo}
              onChange={(value) =>
                setDraft((previous) => ({ ...previous, trainNo: value }))
              }
            />
            <SearchInput
              label="From:"
              placeholder="ต้นทาง"
              value={draft.fromStation}
              onChange={(value) =>
                setDraft((previous) => ({ ...previous, fromStation: value }))
              }
            />
            <SearchInput
              label="To:"
              placeholder="ปลายทาง"
              value={draft.toStation}
              onChange={(value) =>
                setDraft((previous) => ({ ...previous, toStation: value }))
              }
            />
            <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                <i className="fa-solid fa-magnifying-glass mr-2" /> Search
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Train No
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Time
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Gate
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  From
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  To
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Remark
                </th>
                <th scope="col" className="px-6 py-4 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-800">
              {query.isLoading ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={8}>
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : query.data && query.data.length > 0 ? (
                query.data.map((schedule) => (
                  <TrainScheduleRow key={schedule.trainNo} schedule={schedule} />
                ))
              ) : (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={8}>
                    ไม่พบข้อมูลรถไฟ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function TrainScheduleRow({ schedule }: { schedule: TrainSchedule }) {
  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-blue-600">
        {schedule.trainNo}
      </td>
      <td className="px-6 py-4">{schedule.trainDate.slice(0, 10)}</td>
      <td className="px-6 py-4">{schedule.trainTime.slice(0, 5)}</td>
      <td className="px-6 py-4">
        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
          {schedule.gate}
        </span>
      </td>
      <td className="px-6 py-4">{schedule.fromStation}</td>
      <td className="px-6 py-4">{schedule.toStation}</td>
      <td className="px-6 py-4 text-gray-400">{schedule.remark || "-"}</td>
      <td className="px-6 py-4 text-center">
        <Link
          href={`/manage?trainNo=${encodeURIComponent(schedule.trainNo)}`}
          className="mr-3 font-medium text-amber-600 hover:text-amber-900"
        >
          <i className="fa-regular fa-pen-to-square" /> แก้ไข
        </Link>
      </td>
    </tr>
  );
}
