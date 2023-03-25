function calculateRotationDegrees(mouseX, mouseY, elementRect) {
    const halfWidth = elementRect.width / 2;
    const halfHeight = elementRect.height / 2;
    const centerX = elementRect.x + halfWidth;
    const centerY = elementRect.y + halfHeight;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const rotationX = deltaY / halfHeight * 15; // Adjust the multiplier (15) for desired rotation range
    const rotationY = -deltaX / halfWidth * 15; // Adjust the multiplier (15) for desired rotation range
    return { rotationX, rotationY };
}
  
function updateFaceRotation(e) {
    const faceImage = document.getElementById("face-image");
    const rect = faceImage.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const { rotationX, rotationY } = calculateRotationDegrees(mouseX, mouseY, rect);
  
    const limitedRotationX = Math.max(Math.min(rotationX, 30), -30);
    const limitedRotationY = Math.max(Math.min(rotationY, 30), -30);
  
    faceImage.style.transform = `rotateX(${limitedRotationX}deg) rotateY(${limitedRotationY}deg)`;
}
  
export { calculateRotationDegrees, updateFaceRotation };
  