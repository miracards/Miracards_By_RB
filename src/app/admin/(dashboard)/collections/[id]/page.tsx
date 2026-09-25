"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Edit2, Trash2, Upload, Tag, Image as ImageIcon, Loader2, AlertCircle, Grid, List, Star } from "lucide-react";

const GOLD = "#C9A227";
const NAVY = "#0B1D3A";
const BORDER = "#E7DFD4";
const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL ?? "";

interface Collection { _id: string; slug: string; title: string; type: string; style: string; coverImage: string }
interface SubCategory { _id: string; name: string; slug: string; prefix: string; sortOrder: number }
interface CardImage { _id: string; code: string; title: string; s3Url: string; s3Key: string; subCategoryId: string | null; sortOrder: number; details?: string }

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(11,29,58,0.4)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 24px", overflowY: "auto" }} onClick={onClose}>
      <div style={{ background: "#FFF", borderRadius: "20px", padding: "28px", maxWidth: "480px", width: "100%", border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(11,29,58,0.15)" }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: NAVY, margin: "0 0 20px" }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

const convertToWebP = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas toBlob failed"));
            }
          },
          "image/webp",
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};

function Inp({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "5px" }}>{label}</label>
      <input {...p} className="premium-input" />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (val: string) => void; options: { value: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div style={{ marginBottom: "16px", position: "relative" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>{label}</label>
      
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: `1.5px solid ${isOpen ? GOLD : BORDER}`,
          borderRadius: "10px",
          fontSize: "14px",
          color: NAVY,
          background: "#FFF",
          outline: "none",
          boxSizing: "border-box",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          boxShadow: isOpen ? "0 0 0 3px rgba(201, 162, 39, 0.1)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontWeight: 500 }}>{selectedOption?.label ?? "None"}</span>
        <span style={{
          display: "inline-block",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          color: NAVY,
          fontSize: "10px",
        }}>
          ▼
        </span>
      </button>

      {/* Backdrop for closing */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            background: "transparent"
          }}
        />
      )}

      {/* Dropdown Options List */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "6px",
            background: "#FFF",
            border: `1px solid ${BORDER}`,
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(11,29,58,0.08)",
            zIndex: 999,
            maxHeight: "220px",
            overflowY: "auto",
            padding: "6px 0",
          }}
        >
          {options.map(opt => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#FFF" : NAVY,
                  background: isSelected ? GOLD : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#F5F2EC";
                    e.currentTarget.style.color = GOLD;
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = NAVY;
                  }
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CollectionDetailPage() {
  const params = useParams();
  const collectionId = params.id as string;

  const [collection, setCollection] = useState<Collection | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [images, setImages] = useState<CardImage[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Sub-category form
  const [subModal, setSubModal] = useState(false);
  const [editingSub, setEditingSub] = useState<SubCategory | null>(null);
  const [subForm, setSubForm] = useState({ name: "", slug: "", prefix: "", sortOrder: 0 });
  const [subSaving, setSubSaving] = useState(false);
  const [subError, setSubError] = useState("");

  // Image upload form
  const [imgModal, setImgModal] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgForm, setImgForm] = useState({ code: "", title: "", details: "", sortOrder: 0, subCategoryId: "" });
  const [imgUploading, setImgUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imgError, setImgError] = useState("");
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [editingImage, setEditingImage] = useState<CardImage | null>(null);
  // Tracks which imgForm fields were auto-filled from collection name
  const [imgAutoFilled, setImgAutoFilled] = useState<{ code: boolean; title: boolean }>({ code: false, title: false });

  /**
   * Generate a short prefix from a collection/sub-category title.
   * Rules:
   *   1. Remove generic words (Invitation, Board, Collection, Card, Welcome, Digital, Video, Premium)
   *   2. Take remaining words:
   *      - If 1 word left: first 5 chars (e.g. "VASTUPUJAN" → "VASTU")
   *      - If 2+ words: initials of each (e.g. "Wedding Invitation" stripped → "Wedding" → "WED"? no, initials "WI")
   *      Actually: if 2+ significant words use initials, if 1 significant word use first 5 chars
   *   3. UPPERCASE, max 5 chars
   */
  const generateCollectionCodePrefix = (title: string): string => {
    const SKIP = [
      "invitation", "invitations", "collection", "collections",
      "card", "cards", "board", "boards", "welcome",
      "digital", "video", "premium", "luxury", "super",
    ];
    const words = title.trim().split(/\s+/).filter(
      w => !SKIP.includes(w.toLowerCase()) && w.length > 0
    );
    if (words.length === 0) {
      // Fallback: first 4 chars of full title
      return title.replace(/\s+/g, "").substring(0, 4).toUpperCase();
    }
    if (words.length === 1) {
      return words[0].substring(0, 5).toUpperCase();
    }
    // 2+ significant words → initials (max 4)
    return words.map(w => w[0]).join("").substring(0, 4).toUpperCase();
  };

  /**
   * Generate { code, title } for a new image upload.
   * Uses sub-category prefix if available, else derives from collection title.
   * Number = count of existing images in this sub/collection + 1.
   */
  const generateCodeAndTitle = (subCategoryId: string): { code: string; title: string } => {
    const sub = subCategories.find(s => s._id === subCategoryId);

    // Count existing images for this sub (or collection-level if no sub)
    const existingCount = images.filter(img =>
      subCategoryId ? img.subCategoryId === subCategoryId : !img.subCategoryId
    ).length;
    const num = existingCount + 1;
    const formattedNum = String(num).padStart(3, "0");

    // Code prefix: sub has explicit prefix, else derive from collection title
    const prefix = sub ? sub.prefix : generateCollectionCodePrefix(collection?.title ?? "IMG");
    const code = `${prefix}-${formattedNum}`;

    // Title: "{Sub name} #{num}" or "{Collection title} #{num}"
    const baseName = sub
      ? `${sub.name}${collection?.slug === "welcome-boards" ? " Welcome Board" : ""}`
      : (collection?.title ?? "Design");
    const title = `${baseName.trim()} #${num}`;

    return { code, title };
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/collections/${collectionId}`);
    if (res.ok) {
      const d = await res.json();
      setCollection(d.collection);
      setSubCategories(d.subCategories);
    }
    const imgRes = await fetch(`/api/admin/images?collectionId=${collectionId}`);
    if (imgRes.ok) { const d = await imgRes.json(); setImages(d.images); }
    setLoading(false);
  }, [collectionId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  useEffect(() => {
    if (subModal || imgModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [subModal, imgModal]);

  // Sub-category CRUD
  const openAddSub = () => { setEditingSub(null); setSubForm({ name: "", slug: "", prefix: "", sortOrder: 0 }); setSubError(""); setSubModal(true); };
  const openEditSub = (s: SubCategory) => { setEditingSub(s); setSubForm({ name: s.name, slug: s.slug, prefix: s.prefix, sortOrder: s.sortOrder }); setSubError(""); setSubModal(true); };

  const saveSub = async () => {
    if (!subForm.name || !subForm.slug || !subForm.prefix) { setSubError("Name, slug and prefix are required"); return; }
    setSubSaving(true); setSubError("");
    const url = editingSub ? `/api/admin/subcategories/${editingSub._id}` : "/api/admin/subcategories";
    const method = editingSub ? "PATCH" : "POST";
    const body = editingSub ? subForm : { ...subForm, collectionId };
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSubSaving(false);
    if (res.ok) { setSubModal(false); fetchAll(); }
    else { const d = await res.json(); setSubError(d.error ?? "Failed"); }
  };

  const deleteSub = async (id: string) => {
    if (!confirm("Delete this sub-category and all its images?")) return;
    await fetch(`/api/admin/subcategories/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const openEditImage = (img: CardImage) => {
    setEditingImage(img);
    setImgForm({
      code: img.code,
      title: img.title,
      details: img.details || "",
      sortOrder: img.sortOrder,
      subCategoryId: img.subCategoryId || "",
    });
    setImgFile(null);
    setImgError("");
    setImgModal(true);
  };

  const handleUpload = async () => {
    if (!editingImage && !imgFile) { setImgError("Image file is required"); return; }
    if (!imgForm.code || !imgForm.title) { setImgError("Code and title are required"); return; }
    
    if (imgFile) {
      const isVideo = imgFile.type.startsWith("video/");
      const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for image
      if (imgFile.size > maxSize) {
        setImgError(`File size exceeds limit (${isVideo ? "100MB" : "10MB"})`);
        return;
      }
    }

    setImgUploading(true);
    setImgError("");
    setUploadProgress(0);

    try {
      let uploadFile = imgFile;
      if (imgFile && imgFile.type.startsWith("image/") && imgFile.type !== "image/webp") {
        try {
          const webpBlob = await convertToWebP(imgFile);
          uploadFile = new File([webpBlob], `${imgForm.code}.webp`, { type: "image/webp" });
        } catch (e) {
          console.error("WebP conversion failed, fallback to original", e);
        }
      }

      const formData = new FormData();
      
      if (uploadFile) {
        formData.append("file", uploadFile);
        const ext = uploadFile.name.split(".").pop()?.toLowerCase() ?? "webp";
        const finalS3Key = `collections/${collection?.slug}/${imgForm.subCategoryId ? subCategories.find(s => s._id === imgForm.subCategoryId)?.slug + "/" : ""}${imgForm.code}.${ext}`;
        formData.append("s3Key", finalS3Key);
      } else if (editingImage) {
        formData.append("s3Key", editingImage.s3Key);
      }

      formData.append("subCategoryId", imgForm.subCategoryId || "");
      formData.append("code", imgForm.code);
      formData.append("title", imgForm.title);
      formData.append("details", imgForm.details);
      formData.append("sortOrder", String(imgForm.sortOrder));
      if (!editingImage) {
        formData.append("collectionId", collectionId);
      }

      const xhr = new XMLHttpRequest();
      xhr.open(editingImage ? "PATCH" : "POST", editingImage ? `/api/admin/images?id=${editingImage._id}` : "/api/admin/images");
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentage);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setImgModal(false);
          setImgFile(null);
          setEditingImage(null);
          setImgForm({ code: "", title: "", details: "", sortOrder: 0, subCategoryId: "" });
          setUploadProgress(null);
          setImgUploading(false);
          fetchAll();
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            setImgError(errData.error || "Failed to save image.");
          } catch {
            setImgError("Failed to save image.");
          }
          setUploadProgress(null);
          setImgUploading(false);
        }
      };

      xhr.onerror = () => {
        setImgError("An error occurred during upload.");
        setUploadProgress(null);
        setImgUploading(false);
      };

      xhr.send(formData);
    } catch (err: any) {
      setImgError(err.message || "Failed to save image. Please try again.");
      setUploadProgress(null);
      setImgUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/images?id=${id}`, { method: "DELETE" });
    fetchAll();
  };

  const setAsCover = async (imageUrl: string) => {
    try {
      const res = await fetch(`/api/admin/collections/${collectionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImage: imageUrl }),
      });
      if (res.ok) {
        const d = await res.json();
        setCollection(d.collection);
      } else {
        alert("Failed to update cover image.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating cover image.");
    }
  };

  const filteredImages = activeTab === "all" ? images : images.filter(img => img.subCategoryId === activeTab || (activeTab === "uncategorized" && !img.subCategoryId));

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}><Loader2 size={32} color={GOLD} style={{ animation: "spin 0.8s linear infinite" }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  return (
    <div style={{ padding: "32px", width: "100%", boxSizing: "border-box" }}>
      <style>{`
        .premium-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          font-size: 14px;
          color: ${NAVY};
          background: #FDFCFB;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .premium-input:focus {
          border-color: ${GOLD};
          background: #FFF;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
        }
        .tab-btn {
          padding: 8px 18px;
          border-radius: 20px;
          border: 1.5px solid ${BORDER};
          background: #FFF;
          color: #5F5F5F;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tab-btn:hover {
          border-color: ${GOLD};
          color: ${GOLD};
        }
        .tab-btn.active {
          background: ${GOLD};
          border-color: ${GOLD};
          color: #FFF;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
        }
        .subcat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FCFAF7;
          border: 1.5px solid ${BORDER};
          border-radius: 12px;
          padding: 8px 14px;
          transition: all 0.2s ease;
        }
        .subcat-pill:hover {
          border-color: ${GOLD};
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.05);
        }
        .design-card {
          background: #FFF;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid ${BORDER};
          box-shadow: 0 4px 12px rgba(11,29,58,0.01);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .design-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(11,29,58,0.05);
          border-color: ${GOLD};
        }
        .gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: ${GOLD};
          color: #FFF;
          border: none;
          border-radius: 10px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(201,162,39,0.2);
          transition: all 0.25s ease;
        }
        .gold-btn:hover {
          background: #A88414;
          transform: translateY(-1px);
        }
        .gold-btn:active {
          transform: translateY(0);
        }
        .outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(201,162,39,0.06);
          color: ${GOLD};
          border: 1.5px solid rgba(201,162,39,0.2);
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .outline-btn:hover {
          background: rgba(201,162,39,0.12);
          border-color: ${GOLD};
        }
        .table-row-hover:hover {
          background: #FCFAF7;
        }
      `}</style>

      <Link href="/admin/collections" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#5F5F5F", textDecoration: "none", marginBottom: "24px", fontWeight: 600 }}>
        <ArrowLeft size={14} /> Back to Collections
      </Link>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>{collection?.title}</h1>
          <p style={{ fontSize: "13px", color: "#5F5F5F", fontWeight: 500 }}>
            /{collection?.slug} <span style={{ margin: "0 6px", color: BORDER }}>|</span> {collection?.type} <span style={{ margin: "0 6px", color: BORDER }}>|</span> {collection?.style}
          </p>
        </div>
      </div>

      {/* Sub-categories Section */}
      <div style={{ background: "#FFF", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(11,29,58,0.01)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Tag size={18} color={GOLD} />
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: NAVY, margin: 0 }}>Sub-Categories</h2>
            <span style={{ fontSize: "12px", color: NAVY, background: "#F5F2EC", padding: "2px 10px", borderRadius: "20px", fontWeight: 700, border: `1px solid ${BORDER}` }}>{subCategories.length}</span>
          </div>
          <button onClick={openAddSub} className="outline-btn">
            <Plus size={14} /> Add Sub-Category
          </button>
        </div>

        {subCategories.length === 0 ? (
          <p style={{ color: "#5F5F5F", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>No sub-categories. Add one to enable filtering on the detail page.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {subCategories.map(s => {
              const count = images.filter(img => img.subCategoryId === s._id).length;
              return (
                <div
                  key={s._id}
                  style={{
                    background: "#FFF",
                    border: `1.5px solid ${BORDER}`,
                    borderLeft: `4px solid ${GOLD}`,
                    borderRadius: "14px",
                    padding: "16px",
                    boxShadow: "0 4px 15px rgba(11, 29, 58, 0.02)",
                    position: "relative",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "110px",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(11, 29, 58, 0.06)";
                    e.currentTarget.style.borderColor = GOLD;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(11, 29, 58, 0.02)";
                    e.currentTarget.style.borderColor = BORDER;
                  }}
                >
                  {/* Top Row: Prefix and Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: GOLD,
                      background: "#FCFAF7",
                      border: `1px solid ${BORDER}`,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      letterSpacing: "0.5px",
                    }}>
                      {s.prefix}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => openEditSub(s)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#718096",
                          padding: "6px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#F5F2EC";
                          e.currentTarget.style.color = NAVY;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.color = "#718096";
                        }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => deleteSub(s._id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#E53E3E",
                          padding: "6px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#FFF5F5";
                          e.currentTarget.style.color = "#C53030";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.color = "#E53E3E";
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Middle Row: Title */}
                  <div style={{ marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: 0, lineHeight: "1.3" }}>
                      {s.name}
                    </h3>
                    <div style={{ fontSize: "11px", color: "#718096", marginTop: "2px", fontWeight: 500 }}>
                      /{s.slug}
                    </div>
                  </div>

                  {/* Bottom Row: Item Count */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: NAVY,
                      background: "#F5F2EC",
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}>
                      {count} {count === 1 ? "Design" : "Designs"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Images Section */}
      <div style={{ background: "#FFF", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "24px", boxShadow: "0 4px 20px rgba(11,29,58,0.01)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ImageIcon size={18} color={GOLD} />
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: NAVY, margin: 0 }}>Card Images</h2>
            <span style={{ fontSize: "12px", color: NAVY, background: "#F5F2EC", padding: "2px 10px", borderRadius: "20px", fontWeight: 700, border: `1px solid ${BORDER}` }}>{images.length}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Layout Switcher */}
            <div style={{ display: "flex", gap: "4px", border: `1.5px solid ${BORDER}`, borderRadius: "10px", padding: "2px", background: "#FCFAF7" }}>
              <button
                type="button"
                onClick={() => setLayout("grid")}
                title="Grid View"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "7px",
                  border: "none",
                  background: layout === "grid" ? GOLD : "transparent",
                  color: layout === "grid" ? "#FFF" : NAVY,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <Grid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLayout("table")}
                title="List/Table View"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "7px",
                  border: "none",
                  background: layout === "table" ? GOLD : "transparent",
                  color: layout === "table" ? "#FFF" : NAVY,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <List size={16} />
              </button>
            </div>

            <button onClick={() => {
              setImgModal(true);
              setImgError("");
              setImgFile(null);
              setEditingImage(null);
              setImgAutoFilled({ code: false, title: false });

              const defaultSubId = activeTab !== "all" && activeTab !== "uncategorized" ? activeTab : "";
              const { code, title } = generateCodeAndTitle(defaultSubId);

              setImgForm({
                code,
                title,
                details: "",
                sortOrder: images.length,
                subCategoryId: defaultSubId,
              });
              setImgAutoFilled({ code: true, title: true });
            }} className="gold-btn">
              <Upload size={14} /> Upload Image
            </button>
          </div>
        </div>

        {/* Sub-category filter tabs */}
        {subCategories.length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["all", "uncategorized", ...subCategories.map(s => s._id)].map(tabId => {
              const label = tabId === "all" ? "All Designs" : tabId === "uncategorized" ? "Uncategorized" : subCategories.find(s => s._id === tabId)?.name ?? tabId;
              const isActive = activeTab === tabId;
              return (
                <button key={tabId} onClick={() => setActiveTab(tabId)} className={`tab-btn ${isActive ? "active" : ""}`}>
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {filteredImages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <ImageIcon size={36} color="#CBD5E0" style={{ display: "block", margin: "0 auto 12px" }} />
            <p style={{ color: "#5F5F5F", fontSize: "14px" }}>No images found. Upload a design or adjust filters.</p>
          </div>
        ) : layout === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {filteredImages.map(img => (
              <div key={img._id} className="design-card">
                <div style={{ position: "relative", width: "100%", height: "150px" }}>
                  <Image src={img.s3Url} alt={img.title} fill style={{ objectFit: "cover" }} unoptimized={img.s3Url.startsWith(S3_BASE)} />
                  <span style={{ position: "absolute", top: "8px", left: "8px", background: NAVY, borderLeft: `2.5px solid ${GOLD}`, color: "#FFF", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
                    {img.code}
                  </span>
                  {collection?.coverImage === img.s3Url && (
                    <span style={{ position: "absolute", top: "8px", right: "8px", background: GOLD, color: "#FFF", fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}>
                      COVER
                    </span>
                  )}
                </div>
                <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: NAVY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, paddingRight: "8px" }} title={img.title}>
                    {img.title}
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                    <button 
                      onClick={() => setAsCover(img.s3Url)} 
                      title={collection?.coverImage === img.s3Url ? "Currently Collection Cover" : "Set as Collection Cover"}
                      style={{ background: "none", border: "none", cursor: "pointer", color: collection?.coverImage === img.s3Url ? GOLD : "#718096", padding: "2px", display: "flex", alignItems: "center" }}
                    >
                      <Star size={14} fill={collection?.coverImage === img.s3Url ? GOLD : "none"} />
                    </button>
                    <button onClick={() => openEditImage(img)} style={{ background: "none", border: "none", cursor: "pointer", color: "#718096", padding: "2px", display: "flex", alignItems: "center" }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deleteImage(img._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#E53E3E", padding: "2px", display: "flex", alignItems: "center" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto", border: `1.5px solid ${BORDER}`, borderRadius: "12px", background: "#FFF" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#FCFAF7", borderBottom: `1.5px solid ${BORDER}` }}>
                  <th style={{ padding: "12px 16px", color: NAVY, fontWeight: 700 }}>Design</th>
                  <th style={{ padding: "12px 16px", color: NAVY, fontWeight: 700 }}>Details</th>
                  <th style={{ padding: "12px 16px", color: NAVY, fontWeight: 700 }}>Sub-Category</th>
                  <th style={{ padding: "12px 16px", color: NAVY, fontWeight: 700 }}>Sort Order</th>
                  <th style={{ padding: "12px 16px", color: NAVY, fontWeight: 700, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredImages.map(img => {
                  const sub = subCategories.find(s => s._id === img.subCategoryId);
                  return (
                    <tr key={img._id} style={{ borderBottom: `1px solid ${BORDER}` }} className="table-row-hover">
                      <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", border: `1px solid ${BORDER}`, flexShrink: 0 }}>
                          <Image src={img.s3Url} alt={img.title} fill style={{ objectFit: "cover" }} unoptimized={img.s3Url.startsWith(S3_BASE)} />
                        </div>
                        <div>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: GOLD, background: "#FCFAF7", border: `1px solid ${BORDER}`, padding: "2px 6px", borderRadius: "4px", marginRight: "6px" }}>{img.code}</span>
                          <span style={{ fontWeight: 600, color: NAVY }}>{img.title}</span>
                          {collection?.coverImage === img.s3Url && (
                            <span style={{ marginLeft: "8px", fontSize: "9px", fontWeight: 800, background: GOLD, color: "#FFF", padding: "1px 6px", borderRadius: "4px" }}>
                              COVER
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#5F5F5F" }}>{img.details || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        {sub ? (
                          <span style={{ fontSize: "11px", fontWeight: 700, color: NAVY, background: "#F5F2EC", padding: "2px 8px", borderRadius: "12px" }}>{sub.name}</span>
                        ) : (
                          <span style={{ fontSize: "11px", color: "#A0AEC0" }}>None</span>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#5F5F5F" }}>{img.sortOrder}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <button
                            onClick={() => setAsCover(img.s3Url)}
                            title={collection?.coverImage === img.s3Url ? "Currently Collection Cover" : "Set as Collection Cover"}
                            style={{ background: "none", border: "none", cursor: "pointer", color: collection?.coverImage === img.s3Url ? GOLD : "#718096", padding: "4px", borderRadius: "6px" }}
                          >
                            <Star size={15} fill={collection?.coverImage === img.s3Url ? GOLD : "none"} />
                          </button>
                          <button
                            onClick={() => openEditImage(img)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#718096", padding: "4px", borderRadius: "6px" }}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => deleteImage(img._id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#E53E3E", padding: "4px", borderRadius: "6px" }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sub-category Modal */}
      <Modal open={subModal} onClose={() => setSubModal(false)} title={editingSub ? "Edit Sub-Category" : "Add Sub-Category"}>
        <Inp
          label="Name *"
          value={subForm.name}
          onChange={e => {
            const val = e.target.value;
            const generatedSlug = val.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            
            const words = val.trim().split(/\s+/);
            let generatedPrefix = "";
            if (words.length > 1) {
              generatedPrefix = words.map(w => w[0]).join("").replace(/[^a-zA-Z0-9]/g, "").substring(0, 3).toUpperCase();
            } else {
              generatedPrefix = val.replace(/[^a-zA-Z0-9]/g, "").substring(0, 3).toUpperCase();
            }

            setSubForm(f => ({ ...f, name: val, slug: generatedSlug, prefix: generatedPrefix }));
          }}
          placeholder="e.g. Haldi"
        />
        <Inp label="Slug *" value={subForm.slug} onChange={e => setSubForm(f => ({ ...f, slug: e.target.value.toLowerCase() }))} placeholder="e.g. haldi" />
        <Inp label="Code Prefix *" value={subForm.prefix} onChange={e => setSubForm(f => ({ ...f, prefix: e.target.value.toUpperCase() }))} placeholder="e.g. HLD" maxLength={6} />
        <Inp label="Sort Order" type="number" value={subForm.sortOrder} onChange={e => setSubForm(f => ({ ...f, sortOrder: +e.target.value }))} />
        {subError && <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#C53030", marginBottom: "12px", display: "flex", gap: "8px" }}><AlertCircle size={14} />{subError}</div>}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
          <button onClick={() => setSubModal(false)} style={{ padding: "10px 18px", borderRadius: "10px", border: "1.5px solid #E2E8F0", background: "#FFF", color: NAVY, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button onClick={saveSub} disabled={subSaving} className="gold-btn" style={{ borderRadius: "10px", padding: "10px 20px" }}>
            {subSaving ? "Saving…" : editingSub ? "Save" : "Add"}
          </button>
        </div>
      </Modal>

      {/* Image Upload Modal */}
      <Modal open={imgModal} onClose={() => { setImgModal(false); setEditingImage(null); setImgAutoFilled({ code: false, title: false }); }} title={editingImage ? "Edit Card Image" : "Upload Card Image"}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>Image/Video File {editingImage ? "(Optional)" : "*"}</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={e => {
              const file = e.target.files?.[0] ?? null;
              setImgFile(file);
              setImgError("");
              // Code & Title come from collection name — do NOT override from filename
            }}
            className="premium-input"
            style={{ padding: "8px 10px" }}
          />
          {!editingImage && (
            <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "5px", margin: "5px 0 0" }}>
              💡 Code aur Title collection name se auto-generate hote hain — zaroorat ho to edit karein.
            </p>
          )}
        </div>
        {/* Card Code */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>Card Code *</label>
            {imgAutoFilled.code && !editingImage && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "10px", fontWeight: 700, color: "#059669", background: "#ECFDF5", border: "1px solid #BBF7D0", borderRadius: "20px", padding: "1px 7px" }}>
                ✦ Auto-filled
              </span>
            )}
          </div>
          <input
            value={imgForm.code}
            onChange={e => { setImgForm(f => ({ ...f, code: e.target.value })); setImgAutoFilled(a => ({ ...a, code: false })); }}
            placeholder="e.g. WI-001"
            className="premium-input"
          />
        </div>
        {/* Title */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>Title *</label>
            {imgAutoFilled.title && !editingImage && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "10px", fontWeight: 700, color: "#059669", background: "#ECFDF5", border: "1px solid #BBF7D0", borderRadius: "20px", padding: "1px 7px" }}>
                ✦ Auto-filled
              </span>
            )}
          </div>
          <input
            value={imgForm.title}
            onChange={e => { setImgForm(f => ({ ...f, title: e.target.value })); setImgAutoFilled(a => ({ ...a, title: false })); }}
            placeholder="e.g. Wedding Suite #1"
            className="premium-input"
          />
        </div>
        <Inp label="Details" value={imgForm.details} onChange={e => setImgForm(f => ({ ...f, details: e.target.value }))} placeholder="Short description" />
        <Inp label="Sort Order" type="number" value={imgForm.sortOrder} onChange={e => setImgForm(f => ({ ...f, sortOrder: +e.target.value }))} />
        {subCategories.length > 0 && (
          <Select
            label="Sub-Category"
            value={imgForm.subCategoryId}
            onChange={val => {
              // Regenerate both code AND title when sub-category changes
              const { code, title } = generateCodeAndTitle(val);
              setImgForm(f => ({
                ...f,
                subCategoryId: val,
                code,
                title,
              }));
              setImgAutoFilled({ code: true, title: true });
            }}
            options={[
              { value: "", label: "None" },
              ...subCategories.map(s => ({ value: s._id, label: s.name }))
            ]}
          />
        )}
        {imgUploading && uploadProgress !== null && (
          <div style={{ margin: "16px 0 8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>
              <span>Uploading File...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "#F5F2EC", borderRadius: "4px", overflow: "hidden" }}>
              <div 
                style={{ 
                  width: `${uploadProgress}%`, 
                  height: "100%", 
                  background: GOLD, 
                  borderRadius: "4px", 
                  transition: "width 0.1s ease-out" 
                }} 
              />
            </div>
          </div>
        )}
        {imgError && <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#C53030", marginBottom: "12px", display: "flex", gap: "8px" }}><AlertCircle size={14} />{imgError}</div>}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" }}>
          <button onClick={() => { setImgModal(false); setEditingImage(null); }} style={{ padding: "10px 18px", borderRadius: "10px", border: "1.5px solid #E2E8F0", background: "#FFF", color: NAVY, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleUpload} disabled={imgUploading} className="gold-btn" style={{ borderRadius: "10px", padding: "10px 20px" }}>
            {imgUploading ? "Saving…" : editingImage ? "Save" : "Upload"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
