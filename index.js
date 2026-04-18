require('dotenv').config();
const express = require('express');
const X402Wrapper = require('./x402-express-lib');

const app = express();
app.use(express.json());

// Fase 3: Configuración estricta del Escudo x402
const x402 = new X402Wrapper({
    rpcUrl: process.env.BASE_RPC_URL || "https://mainnet.base.org",
    privateKey: process.env.PRIVATE_KEY, // Llave de la tesorería o relayer para pagar gas
    recipient: "0xbf7E0D10518FA3cEba855223bdBF7886BfCDe01A", // Billetera del creador de la API
});

// Fase 1 y 2: Lógica AEO/SEO encapsulada y protegida
// El precio está fijo en $0.05 USDC (50000 unidades considerando 6 decimales)
app.post('/api/seo-aeo-cluster', x402.requirePayment("50000"), async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ error: "Falta el campo 'topic' en el body." });
        }

        console.log(`[The Gem Smith] Construyendo mega-reporte AEO/SEO para: "${topic}"...`);
        console.log(`[x402] Pago de 0.05 USDC confirmado. Transacción de liquidación: ${req.paymentTx}`);

        // Simulando análisis de 2000ms que representa el trabajo en profundidad de IA
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mega-reporte estructurado siguiendo @seo-aeo-engine directives
        const report = {
            success: true,
            receipt: req.paymentTx,
            report: {
                target_topic: topic,
                search_intent: "Transactional & Informational Hybrid",
                semantic_cluster: {
                    pillar: topic,
                    hub_pages: [
                        `Guía definitiva sobre ${topic}`,
                        `Las mejores herramientas para ${topic} en 2026`,
                        `Diferencias entre ${topic} y alternativas tradicionales`
                    ]
                },
                lsi_keywords: [
                    `${topic} para empresas`,
                    `beneficios de ${topic} descentralizado`,
                    `${topic} vs legacy API`,
                    `automatización con ${topic}`
                ],
                aeo_questions: [
                    {
                        question: `¿Qué es y cómo funciona ${topic}?`,
                        snippet_target: `Definición directa y técnica de menos de 45 palabras. Funciona como...`
                    },
                    {
                        question: `¿Por qué los agentes IA necesitan ${topic}?`,
                        snippet_target: `Bullet points estructurados mostrando eficiencia, costos y escalabilidad.`
                    }
                ],
                technical_schema: "FAQPage + Organization + SoftwareApplication"
            }
        };

        res.json(report);
    } catch (error) {
        console.error("Error del servidor:", error);
        res.status(500).json({ error: "Error procesando el reporte SEO." });
    }
});

// Landing page simple para verificar que el servidor está vivo en el navegador
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #6366f1;">💎 The Gem Smith MCP is ONLINE</h1>
            <p>El motor de AEO/SEO está funcionando correctamente.</p>
            <p style="color: #666;">Nota: Los endpoints de IA están protegidos por el protocolo x402.</p>
            <hr style="width: 200px; margin: 20px auto; border: 0; border-top: 1px solid #eee;">
            <small style="color: #999;">Tesorería: 0x8aaBAB75bE8825d0f5D514a9a5cBa04B7bF84920</small>
        </div>
    `);
});

// Endpoint de prueba (gratis) para verificar disponibilidad
app.get('/ping', (req, res) => {
    res.json({ message: "The Gem Smith MCP Engine is Online.", status: "healthy" });
});

// No es estrictamente necesario llamar a listen() en Vercel, ya que ellos invocan el export
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => {
        console.log(`💎 The Gem Smith (AEO/SEO Engine) iniciado en el puerto ${PORT}`);
        console.log(`🛡️  Muro de pago x402 activo. Tarifa: $0.05 USDC.`);
        console.log(`=======================================================`);
    });
}

module.exports = app;
