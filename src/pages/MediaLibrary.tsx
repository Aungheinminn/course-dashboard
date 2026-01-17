import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { ImageCard } from "../components/ImageCard";
import { PdfCard } from "../components/PdfCard";
import { ConfirmDialog } from "../components/ui/confirm-dialog";

type MediaType = "photo" | "pdf" | "profile";

interface MediaItem {
  id: string;
  type: MediaType;
  name: string;
  uploadedAt: Date;
  size: number;
  url: string;
}

export const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState<MediaType>("photo");
  const [media, setMedia] = useState<MediaItem[]>([
    // Sample data - replace with actual API data
    {
      id: "1",
      type: "photo",
      name: "course-banner.jpg",
      uploadedAt: new Date("2025-01-05"),
      size: 2048000,
      url: "https://picsum.photos/200/300",
    },
    {
      id: "2",
      type: "photo",
      name: "lesson-image.png",
      uploadedAt: new Date("2025-01-04"),
      size: 1536000,
      url: "https://picsum.photos/200/300",
    },
    {
      id: "3",
      type: "profile",
      name: "admin-profile.jpg",
      uploadedAt: new Date("2025-01-03"),
      size: 512000,
      url: "https://picsum.photos/200/300",
    },
    {
      id: "4",
      type: "pdf",
      name: "course-syllabus.pdf",
      uploadedAt: new Date("2025-01-05"),
      size: 3145728,
      url: "#",
    },
    {
      id: "5",
      type: "pdf",
      name: "lecture-notes.pdf",
      uploadedAt: new Date("2025-01-02"),
      size: 2097152,
      url: "#",
    },
  ]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredMedia = media.filter((item) => item.type === activeTab);

  const handleDeleteClick = (id: string) => {
    const item = media.find((m) => m.id === id);
    if (item) {
      setSelectedMedia(item);
      setIsDeleteOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedMedia) return;
    setMedia((prev) => prev.filter((item) => item.id !== selectedMedia.id));
    setIsDeleteOpen(false);
    setSelectedMedia(null);
  };

  const tabLabels: Record<MediaType, string> = {
    photo: "Photos",
    pdf: "PDFs",
    profile: "Profile Picture",
  };

  return (
    <div className="p-6 w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Library</h1>

          {/* Tab Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                {tabLabels[activeTab]}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setActiveTab("photo")}>
                {tabLabels.photo}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("pdf")}>
                {tabLabels.pdf}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                {tabLabels.profile}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Upload Button */}
        <Button className="flex items-center gap-2">
          <Upload size={16} />
          Upload
        </Button>
      </div>

       {/* Media Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredMedia.length > 0 ? (
           filteredMedia.map((item) => {
             if (item.type === "pdf") {
               return (
                 <PdfCard item={item} key={item.id} onDeleteClick={handleDeleteClick} />
               );
             }
             return (
               <ImageCard item={item} key={item.id} onDeleteClick={handleDeleteClick} />
             );
           })
         ) : (
           <div className="col-span-full py-16 text-center">
             <div className="text-6xl mb-4 opacity-20">
               {activeTab === "photo" ? "🖼️" : activeTab === "pdf" ? "📑" : "👤"}
             </div>
             <p className="text-slate-600 text-lg font-semibold">
               No {tabLabels[activeTab].toLowerCase()} uploaded yet
             </p>
             <p className="text-slate-400 text-sm mt-2">
               Click the Upload button to add your first file
             </p>
           </div>
       )}
       </div>

       {/* Delete Confirmation Dialog */}
       <ConfirmDialog
         open={isDeleteOpen}
         onOpenChange={setIsDeleteOpen}
         onConfirm={handleConfirmDelete}
         title={`Delete ${selectedMedia?.type === "pdf" ? "PDF" : "Image"}`}
         description={`Are you sure you want to delete "${selectedMedia?.name}"?`}
         warningText="This action cannot be undone."
         footerText={`The file will be permanently removed from your ${selectedMedia?.type === "pdf" ? "PDF library" : "image library"}.`}
         confirmText={`Delete ${selectedMedia?.type === "pdf" ? "PDF" : "Image"}`}
       />
     </div>
   );
 };
