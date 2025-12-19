"use server";

import { db } from "~/server/db";

export async function getSchools() {
  try {
    const schools = await db.query.school.findMany({
      orderBy: (schools, { asc }) => [asc(schools.name)],
    });
    return schools;
  } catch (error) {
    console.error("Get schools error:", error);
    return [];
  }
}

export async function getCountries() {
  try {
    const countries = await db.query.country.findMany({
      orderBy: (countries, { asc }) => [asc(countries.name)],
    });
    return countries;
  } catch (error) {
    console.error("Get countries error:", error);
    return [];
  }
}
