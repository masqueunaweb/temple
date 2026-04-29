import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured, skipping email sending');
      return NextResponse.json(
        { message: 'Suscripción registrada (email deshabilitado)' },
        { status: 200 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Agregar contacto a la audiencia de Resend
    const { data, error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID || '', // Opcional: ID de audiencia específica
    });

    if (error) {
      console.error('Error adding to Resend:', error);
      return NextResponse.json(
        { error: 'Error al suscribirse' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación
    await resend.emails.send({
      from: 'TEMPLE <noreply@temple.app>',
      to: email,
      subject: 'Bienvenido a TEMPLE',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0A0A0A; font-size: 32px; font-weight: bold; margin-bottom: 20px;">TEMPLE</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Gracias por unirte a la lista de espera de TEMPLE.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            27 días. Constancia silenciosa.
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Te avisaremos cuando estemos listos.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
