import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AudioReel() {
  const [audioPackage, setAudioPackages]
  useEffect(() => {
    fetch("/api/audio/all")
  }, []);
}
