# TowerFlow Units Policy

## Rule

TowerFlow uses SI units for all calculations, result schemas, user interfaces, charts, reports, examples, and exported files.

## Product Units

- Length: m or mm.
- Area: m2 or mm2.
- Force: N or kN.
- Moment: kN.m or N.mm.
- Stress and pressure: MPa, kPa, or Pa.
- Mass: kg.
- Density: kg/m3.
- Wind speed: m/s.
- Angle: degrees unless a calculation routine explicitly requires radians.

## Source Units

Some manufacturer references use imperial units. Original source values may be retained in metadata or reference notes, but calculation inputs and product-facing outputs must use converted SI values.

Example:

- Source note: `10 ft section`.
- TowerFlow geometry value: `3.048 m`.

## Demo Tower

The first demo tower is based on public ROHN 25G-style references. Its product-facing dimensions are:

- Nominal section height: 3.048 m.
- Nominal triangular face width: 0.3175 m.
- Demo tower height: 12.192 m.

The original imperial values are retained only as source metadata.
