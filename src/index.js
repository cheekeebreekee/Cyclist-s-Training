module.exports = function temps(v0, slope, dTot) {

    const GRAVITY_ACC = 9.81 * 3.6 * 60.0; // gravity acceleration 
    const DRAG = 60.0 * 0.3 / 3.6; // force applied by air on the cyclist 
    const DELTA_T = 1.0 / 60.0; // in minutes 
    const D_WATTS = 0.5; // power loss in Watts / minute 
    const G_THRUST = 60.0 * 3.6 * 3.6; // acceleration due to biker's power 
    const MASS = 80.0; // biker's MASS 
    const WATTS0 = 225; 

    let timeInMunutes= 0.0;
    let distance = 0.0;
    let initialSpeed = v0;
    let acceleration = 0.0;
    let power = WATTS0;
    let slopeGravityAcc = -GRAVITY_ACC * Math.sin(Math.atan(slope / 100.0)); 
    while (distance < dTot) { 
        timeInMunutes+= DELTA_T; 
        power -= D_WATTS * DELTA_T; 
        acceleration = slopeGravityAcc - DRAG * Math.abs(initialSpeed) * Math.abs(initialSpeed) / MASS; 
        if ((power > 0.0) && (initialSpeed > 0.0)) {
            acceleration += G_THRUST * power / (initialSpeed * MASS); 
        }
        Math.abs(acceleration) <= 1e-5 ? acceleration = 0.0 : initialSpeed += acceleration * DELTA_T; 
        distance += initialSpeed * DELTA_T / 60.0; // v in km/h, DELTA_T in minutes 
        if (initialSpeed - 3.0 <= 1e-2) return -1; 
    } 
    return Math.round(timeInMunutes); 
}
