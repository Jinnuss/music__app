"use client"
import Image from "next/image";
import DataMussic from "./dataMusic/dataMusic";
import React, { useRef, useState } from 'react';
import FormMusic from "./formMusic/formMusic";

export default function Home() {
  const data = DataMussic();
  const audioRef = useRef(null);
  console.log(data)
  return (
    <>
      <FormMusic />
    </>
  );
}
