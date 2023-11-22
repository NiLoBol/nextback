"use client";
import React from 'react'

export default function log(name) {
    sessionStorage.setItem(name,"Nilobol");
  return sessionStorage.getItem(name)
}
