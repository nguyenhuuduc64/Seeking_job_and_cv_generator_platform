import CKEditorDemo from "../components/common/CKEditorDemo ";
import Button from "../components/common/Button";
import instance from "../config/axios";
function Resume() {
  const handleSave = async () => {
    const cvContent = localStorage.getItem("cv-content-ck");
    if (cvContent) {
      const response = await instance.put("/cvs", {
        content: cvContent,
      });
      console.log(response.data);
    }
  };
  return (
    <div className="mx-auto p-10 bg-gray-50 min-h-screen grid grid-cols-12">
      <div className="md:col-span-8">
        <Button onClick={handleSave} name="Lưu CV" />
        <CKEditorDemo />
      </div>
      <div className="flex md:col-span-4">khu vuc mau cv</div>
    </div>
  );
}

export default Resume;
