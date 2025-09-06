"use client"

import type React from "react"

import { type ReactElement, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/Button/Button"
import { fetchWithToast } from "@/utils/fetch"
import type { CreateTourDto } from "@/dto/tour.dto"
import type { TourType } from "@/types/tour.type"

import styles from "./NewTourForm.module.css"

const tourTypes: TourType[] = [
    { value: "Cultural", label: "فرهنگی" },
    { value: "Adventure", label: "ماجراجویی" },
    { value: "Luxury", label: "لوکس" },
    { value: "Family", label: "خانوادگی" },
    { value: "Nature", label: "طبیعت‌گردی" },
    { value: "Historical", label: "تاریخی" },
    { value: "Sports", label: "ورزشی" },
    { value: "Relaxation", label: "آرامش" },
]

const difficultyLevels = [
    { value: "easy", label: "آسان" },
    { value: "medium", label: "متوسط" },
    { value: "hard", label: "سخت" },
]

export default function NewTourForm(): ReactElement {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<CreateTourDto>({
        title: "",
        type: "",
        typeLabel: "",
        location: "",
        price: 0,
        duration: 1,
        guideAvailable: false,
        image: "",
        description: "",
        highlights: [""],
        itinerary: {},
        included: [""],
        excluded: [""],
        requirements: [""],
        maxCapacity: 1,
        difficulty: "easy",
        bestTime: "",
        transportation: "",
        accommodation: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked
            setFormData((prev) => ({ ...prev, [name]: checked }))
        } else if (type === "number") {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleTourTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = tourTypes.find((type) => type.value === e.target.value)
        setFormData((prev) => ({
            ...prev,
            type: e.target.value,
            typeLabel: selectedType?.label || "",
        }))
    }

    const handleArrayChange = (
        field: keyof Pick<CreateTourDto, "highlights" | "included" | "excluded" | "requirements">,
        index: number,
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? value : item)),
        }))
    }

    const addArrayItem = (field: keyof Pick<CreateTourDto, "highlights" | "included" | "excluded" | "requirements">) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }))
    }

    const removeArrayItem = (
        field: keyof Pick<CreateTourDto, "highlights" | "included" | "excluded" | "requirements">,
        index: number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const cleanedData = {
                ...formData,
                highlights: formData.highlights.filter((item) => item.trim() !== ""),
                included: formData.included.filter((item) => item.trim() !== ""),
                excluded: formData.excluded.filter((item) => item.trim() !== ""),
                requirements: formData.requirements.filter((item) => item.trim() !== ""),
            }

            await fetchWithToast(
                "/tours",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cleanedData),
                },
                    "تور با موفقیت ایجاد شد"
            )

            router.push("/dashboard/profile")
        } catch (error) {
            console.error("Error creating tour:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>اطلاعات اصلی</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="title" className={styles.label}>
                            عنوان تور *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="type" className={styles.label}>
                            نوع تور *
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleTourTypeChange}
                            className={styles.select}
                            required
                        >
                            <option value="">انتخاب کنید</option>
                            {tourTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="location" className={styles.label}>
                            مقصد *
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="price" className={styles.label}>
                            قیمت (تومان) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className={styles.input}
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="duration" className={styles.label}>
                            مدت زمان (روز) *
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className={styles.input}
                            min="1"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="maxCapacity" className={styles.label}>
                            حداکثر ظرفیت *
                        </label>
                        <input
                            type="number"
                            id="maxCapacity"
                            name="maxCapacity"
                            value={formData.maxCapacity}
                            onChange={handleInputChange}
                            className={styles.input}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="difficulty" className={styles.label}>
                            سطح سختی *
                        </label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleInputChange}
                            className={styles.select}
                            required
                        >
                            {difficultyLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="image" className={styles.label}>
                            تصویر (URL) *
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="guideAvailable"
                            checked={formData.guideAvailable}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                        />
                        راهنما در دسترس است
                    </label>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>جزئیات تور</h2>

                <div className={styles.field}>
                    <label htmlFor="description" className={styles.label}>
                        توضیحات *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={styles.textarea}
                        rows={4}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="bestTime" className={styles.label}>
                            بهترین زمان سفر
                        </label>
                        <input
                            type="text"
                            id="bestTime"
                            name="bestTime"
                            value={formData.bestTime}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="مثال: بهار و پاییز"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="transportation" className={styles.label}>
                            نحوه حمل و نقل
                        </label>
                        <input
                            type="text"
                            id="transportation"
                            name="transportation"
                            value={formData.transportation}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="مثال: اتوبوس VIP"
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="accommodation" className={styles.label}>
                        نوع اقامت
                    </label>
                    <input
                        type="text"
                        id="accommodation"
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="مثال: هتل 4 ستاره"
                    />
                </div>
            </div>

            {/* Array fields */}
            {[
                { field: "highlights" as const, title: "نکات برجسته" },
                { field: "included" as const, title: "موارد شامل" },
                { field: "excluded" as const, title: "موارد غیرشامل" },
                { field: "requirements" as const, title: "الزامات" },
            ].map(({ field, title }) => (
                <div key={field} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{title}</h2>
                    {formData[field].map((item, index) => (
                        <div key={index} className={styles.arrayItem}>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange(field, index, e.target.value)}
                                className={styles.input}
                                placeholder={`${title} ${index + 1}`}
                            />
                            {formData[field].length > 1 && (
                                <Button
                                    type="button"
                                    variant="danger"
                                    shape="outlined"
                                    size="medium"
                                    onClick={() => removeArrayItem(field, index)}
                                    className={styles.removeButton}
                                >
                                    حذف
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="default"
                        shape="outlined"
                        size="medium"
                        onClick={() => addArrayItem(field)}
                        className={styles.addButton}
                    >
                        افزودن {title}
                    </Button>
                </div>
            ))}

            <div className={styles.actions}>
                <Button type="submit" variant="primary" size="large" disabled={isLoading}>
                    {isLoading ? "در حال ایجاد..." : "ایجاد تور"}
                </Button>
            </div>
        </form>
    )
}
