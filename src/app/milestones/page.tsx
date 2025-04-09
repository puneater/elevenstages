"use client";

import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import MilestoneCard from "@/components/MilestoneCard";

const ageMapping: Record<number, string> = {
    1: "Birth to 2 Months",
    2: "2 to 3 Months",
    3: "4 to 5 Months",
    4: "6 to 12 Months",
    5: "12 to 18 Months",
    6: "18 to 30 Months",
    7: "30 to 54 Months",
    8: "5 and 6 Years",
    9: "7 and 8 Years",
    10: "9 and 10 Years",
    11: "Transition to Adolescence",
};

interface MilestoneData {
    id_age: number;
    cognitive: string;
    social: string;
    motor: string;
}

const MilestonesPage: React.FC = () => {
    const [milestones, setMilestones] = useState<MilestoneData[]>([]);
    const [filterAge, setFilterAge] = useState<number | "">("");
    const [filterCategory, setFilterCategory] = useState<string>("");

    useEffect(() => {
        async function fetchMilestones() {
            try {
                const snapshot = await getDocs(collection(db, "child_dev_stage"));
                const data = snapshot.docs.map((doc) => doc.data() as MilestoneData);
                data.sort((a, b) => a.id_age - b.id_age);
                setMilestones(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchMilestones();
    }, []);

    const filteredCards: JSX.Element[] = [];
    milestones.forEach((m) => {
        if (filterAge === "" || m.id_age === Number(filterAge)) {
            if ((filterCategory === "" || filterCategory === "Cognitive") && m.cognitive) {
                filteredCards.push(
                    <MilestoneCard
                        key={`${m.id_age}-cognitive`}
                        milestone={{
                            ageRange: ageMapping[m.id_age],
                            category: "Cognitive",
                            details: m.cognitive,
                        }}
                    />
                );
            }
            if ((filterCategory === "" || filterCategory === "Motor") && m.motor) {
                filteredCards.push(
                    <MilestoneCard
                        key={`${m.id_age}-motor`}
                        milestone={{
                            ageRange: ageMapping[m.id_age],
                            category: "Motor",
                            details: m.motor,
                        }}
                    />
                );
            }
            if ((filterCategory === "" || filterCategory === "Social") && m.social) {
                filteredCards.push(
                    <MilestoneCard
                        key={`${m.id_age}-social`}
                        milestone={{
                            ageRange: ageMapping[m.id_age],
                            category: "Social",
                            details: m.social,
                        }}
                    />
                );
            }
        }
    });

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            <div className="mx-auto px-6">
                <header className="mb-6">
                    <h1 className="text-4xl font-bold text-green-800 text-center mb-4">
                        NeuroGrow Lite
                    </h1>
                    <h1 className="text-2xl font-bold text-green-800 text-center mb-4">
                        The 11 Child Developmental Milestones across 3 Skills
                    </h1>
                </header>

                <div className="mb-6 flex flex-col sm:flex-row items-start gap-4">
                    <div>
                        <label htmlFor="age" className="block font-semibold text-lg text-green-800 mb-1">
                            Filter by Age:
                        </label>
                        <select
                            id="age"
                            value={filterAge}
                            onChange={(e) => setFilterAge(e.target.value ? Number(e.target.value) : "")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                        >
                            <option value="">All Ages</option>
                            {Object.entries(ageMapping).map(([id, range]) => (
                                <option key={id} value={id}>
                                    {range}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category" className="block font-semibold text-lg text-green-800 mb-1">
                            Filter by Category:
                        </label>
                        <select
                            id="category"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                        >
                            <option value="">All Categories</option>
                            <option value="Cognitive">Cognitive</option>
                            <option value="Motor">Motor</option>
                            <option value="Social">Social</option>
                        </select>
                    </div>
                </div>

                <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredCards.length > 0 ? (
                        filteredCards
                    ) : (
                        <p className="text-center text-2xl text-green-800 col-span-full">
                            No milestones found.
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MilestonesPage;
