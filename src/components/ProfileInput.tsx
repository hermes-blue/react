import React, { useState, useRef } from 'react';
import { Camera, Ruler, Weight, ArrowRight } from 'lucide-react';
import './ProfileInput.css';

const ProfileInput: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h1>나만의 스타일리스트</h1>
          <p>완벽한 스타일링을 위해 정보를 입력해주세요.</p>
        </header>

        <div className="photo-section">
          <div 
            className={`photo-preview ${photo ? 'has-photo' : ''}`} 
            onClick={handleCameraClick}
          >
            {photo ? (
              <img src={photo} alt="Profile Preview" />
            ) : (
              <div className="photo-placeholder">
                <Camera size={48} strokeWidth={1.5} />
                <span>본인 사진 업로드</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
        </div>

        <form className="info-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>
              <Ruler size={18} />
              <span>키 (cm)</span>
            </label>
            <input 
              type="number" 
              placeholder="예: 175" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>
              <Weight size={18} />
              <span>몸무게 (kg)</span>
            </label>
            <input 
              type="number" 
              placeholder="예: 70" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <button className="submit-button" disabled={!photo || !height || !weight}>
            <span>스타일링 분석 시작</span>
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInput;
