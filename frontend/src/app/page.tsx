import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return <Link href='/user'>User Page로 가기</Link>;
}
